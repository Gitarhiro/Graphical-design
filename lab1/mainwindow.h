
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "dialog.h"
#include <QMainWindow>
#include <QString>
#include <QMainWindow>
#include <QFile>
#include <QFileDialog>
#include <QFileDialog>
#include <QMessageBox>
#include <QJsonObject>
#include <QJsonArray>
#include <QJsonDocument>
#include <QJsonValue>
#include <QJsonParseError>
#include <QTreeWidget>
#include <QTreeWidgetItem>
#include <QDebug>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow

{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_actionOPEN_triggered();

    void on_actionSAVE_triggered();

    void on_actionNEW_triggered();

    void on_actionADD_triggered();

    void on_actionREMOVE_triggered();

    void on_actionMODIFY_triggered();


private:
    Ui::MainWindow *ui;
    QString currentFile = "";
    QString key, value;
    QTreeWidgetItem* rootItem = ui->treeWidget->invisibleRootItem();
    void displayTree();
    void translateToTree(QJsonValue obj, QTreeWidgetItem* parentItem);
    void returnCurrent(QTreeWidgetItem* parentItem);
    QJsonDocument saveTreeToJson();
    QJsonValue createJsonForItem(QTreeWidgetItem* item);
};

#endif // MAINWINDOW_H
