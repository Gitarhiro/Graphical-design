#ifndef DIALOG_H
#define DIALOG_H

#include <ui_mainwindow.h>
#include <QDialog>
#include <QMessageBox>


namespace Ui {
class Dialog;
}

class Dialog : public QDialog
{
    Q_OBJECT

public:
    explicit Dialog(QWidget *parent = nullptr);
    ~Dialog();
    QString getKey();
    QString getVal();

private slots:
    void on_pushButton_3_clicked();

    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

    void on_buttonBox_accepted();

    void on_buttonBox_rejected();

    void on_buttonBox_2_accepted();

    void on_buttonBox_2_rejected();

private:
    Ui::Dialog *ui;
};

#endif // DIALOG_H
