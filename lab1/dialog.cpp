#include "dialog.h"
#include "ui_dialog.h"

Dialog::Dialog(QWidget *parent) :
    QDialog(parent),
    ui(new Ui::Dialog)
{
    ui->setupUi(this);
}

Dialog::~Dialog()
{
    delete ui;
}

void Dialog::on_pushButton_3_clicked() // ADD ARRAY
{
    ui->stackedWidget->setCurrentIndex(1);
}


void Dialog::on_pushButton_clicked() //ADD OBJECT
{

}


void Dialog::on_pushButton_2_clicked() //ADD VALUE
{

}


void Dialog::on_buttonBox_accepted()
{

}


void Dialog::on_buttonBox_rejected()
{
    this->close();
}


void Dialog::on_buttonBox_2_accepted()
{
    QString key = ui->lineEdit->text();
    QString value = ui->lineEdit_2->text();
    if(key.isEmpty() && value.isEmpty())
    {
        QMessageBox :: warning(this, "Warning", "Input is empty!");
        return;
    }
    QTreeWidgetItem* output = new QTreeWidgetItem(QStringList() << key << value);
    //output = w.returnCurrent();
    this->close();
}


void Dialog::on_buttonBox_2_rejected()
{

}

