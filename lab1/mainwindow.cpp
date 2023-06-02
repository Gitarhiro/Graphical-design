#include "dialog.h"
#include "mainwindow.h"
#include "./ui_mainwindow.h"


MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    displayTree();
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_actionOPEN_triggered()
{
    QFileDialog choose(this);
    choose.setNameFilter(tr("JSON file (*.json)"));
    choose.setFileMode(QFileDialog::ExistingFile);
    if(!choose.exec())
    {
        return;
    }
    QStringList filename = choose.selectedFiles();
    QFile file(filename.first());
    currentFile = filename.first();
    if(!file.open(QIODevice :: ReadOnly | QIODevice :: Text)) {
        QMessageBox :: warning(this, "Warning", "Cannot open the file : " + file.errorString());
        return;
    }
    ui->treeWidget->clear();
    setWindowTitle(currentFile);
    QJsonDocument JsonItem = QJsonDocument::fromJson(file.readAll(), nullptr);
    QJsonObject jsonObject = JsonItem.object();
    ui->treeWidget->addTopLevelItem(rootItem);
    translateToTree(jsonObject, rootItem);
    file.close();
}

void MainWindow::on_actionSAVE_triggered()
{
    QJsonDocument data = saveTreeToJson();
    QString filename = QFileDialog :: getSaveFileName(this, tr("Save file"),
                                                     "", tr("Json File (*.json);;All Files (*)"));
    QFile file(filename);
    if(!file.open(QIODevice :: WriteOnly | QFile :: Text)) {
        QMessageBox :: warning(this, "Warning", "Cannot save the file : " + file.errorString());
        return;
    }
    file.write(data.toJson(QJsonDocument::Indented));
    file.close();
    currentFile = filename;
    QDataStream out(&file);
}


void MainWindow::on_actionNEW_triggered()
{
    ui->treeWidget->clear();
}

void MainWindow::displayTree()
{
    ui->treeWidget->setColumnCount(2);
    ui->treeWidget->setColumnWidth(0,300);
    ui->treeWidget->setColumnWidth(1,300);
    ui->treeWidget->setUniformRowHeights(true);
    QStringList labels;
    labels<<"Key"<<"Value";
    ui->treeWidget->setHeaderLabels(labels);
}

void MainWindow::translateToTree(QJsonValue val, QTreeWidgetItem* parentItem)
{
    if(val.isObject())
    {
        QJsonObject obj = val.toObject();
        for(auto it = obj.begin();it != obj.end(); ++it)
        {
            QTreeWidgetItem* child = new QTreeWidgetItem(parentItem, QStringList() << it.key() << "");
            parentItem->addChild(child);
            translateToTree(it.value(), child);
        }
    }
    else if(val.isArray())
    {
        QJsonArray ar = val.toArray();
        for(int i = 0; i < ar.size(); ++i)
        {
            QTreeWidgetItem* child = new QTreeWidgetItem(parentItem);
            parentItem->addChild(child);
            translateToTree(ar.at(i), child);
        }
    }
    else
    {
        QString input = val.toString();
        parentItem->setText(1, input);
    }
}

QJsonDocument MainWindow:: saveTreeToJson() {
    QTreeWidgetItem* topLevelItem = ui->treeWidget->topLevelItem(0);
    // create the top-level object or array
    QJsonValue topLevelValue = createJsonForItem(topLevelItem);
    QJsonObject topLevelObject;
    QJsonArray topLevelArray;
    if (topLevelValue.isArray()) {
        topLevelArray = topLevelValue.toArray();
    } else if (topLevelValue.isObject()) {
        topLevelObject = topLevelValue.toObject();
    }

    // save the object or array to file
    QJsonDocument document;
    if (!topLevelArray.isEmpty()) {
        document.setArray(topLevelArray);
    } else {
        document.setObject(topLevelObject);
    }
    return document;
}

QJsonValue MainWindow::createJsonForItem(QTreeWidgetItem* item) {
    QJsonValue value;
    QJsonObject object;
    QJsonArray array;

    // check if the item has a key and a value
    QString key = item->text(0);
    QString val = item->text(1);
    if (!key.isEmpty() && !val.isEmpty()) {
        // create a JSON value from the item's value
        value = QJsonValue::fromVariant(val);
    } else if (key.isEmpty() && !val.isEmpty()) {
        // create a JSON value in an array
        value = QJsonValue::fromVariant(val);
    } else {
        // create a JSON object or array from the item's children
        bool hasObjectChildren = false;
        bool hasArrayChildren = false;

        for (int i = 0; i < item->childCount(); i++) {
            QTreeWidgetItem* child = item->child(i);
            QJsonValue childValue = createJsonForItem(child);

            if (!child->text(0).isEmpty()) {
                // if the child has a key, assume it's an object
                object[child->text(0)] = childValue;
                hasObjectChildren = true;
            } else {
                // if the child has no key, assume it's a value in an array
                array.append(childValue);
                hasArrayChildren = true;
            }
        }

        // return an object or array depending on the children
        if (hasObjectChildren && !hasArrayChildren) {
            // if the children are all objects, return an object
            value = QJsonValue(object);
        } else if (hasArrayChildren && !hasObjectChildren) {
            // if the children are all values, return an array
            value = QJsonValue(array);
        } else {
            // if the children include both objects and values, return an object with an array as one of its properties
            object["values"] = QJsonValue(array);
            for (int i = 0; i < item->childCount(); i++) {
                QTreeWidgetItem* child = item->child(i);
                QString childKey = child->text(0);
                if (!childKey.isEmpty()) {
                    object[childKey] = createJsonForItem(child);
                }
            }
            value = QJsonValue(object);
        }
    }

    return value;
}

void MainWindow :: returnCurrent(QTreeWidgetItem* parentItem)
{
    parentItem = ui->treeWidget->currentItem();
    return;
}

void MainWindow::on_actionADD_triggered()
{

    Dialog dialog;
    dialog.setModal(true);
    if(dialog.exec())
    {
        key = dialog.getKey();
        value = dialog.getVal();
    }
    QTreeWidgetItem* newone = new QTreeWidgetItem(rootItem, QStringList() << key << value);
    rootItem->addChild(newone);
}



void MainWindow::on_actionREMOVE_triggered()
{
    QTreeWidgetItem* current;
    returnCurrent(current);
    delete current;
}


void MainWindow::on_actionMODIFY_triggered()
{

}

