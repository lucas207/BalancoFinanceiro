import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Expense } from './../../Model/Expense';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-data',
  templateUrl: 'edit-data.html',
})
export class EditDataPage {

  data = { rowid: 0, date: "", type: "", description: "", amount: 0 };
  // data: Expense = new Expense();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private sqlite: SQLite, private toast: Toast) {
    this.getCurrentData(navParams.get("rowid"));
  }

  getCurrentData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db', location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM expense WHERE rowid=?', [rowid])
        .then(res => {
          if (res.rows.length > 0) {
            this.data.rowid = res.rows.item(0).rowid;
            this.data.date = res.rows.item(0).data;
            this.data.type = res.rows.item(0).type;
            this.data.description = res.rows.item(0).description;
            this.data.amount = res.rows.item(0).amount;
          }
        }).catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE expense SET date=?,type=?,description=?,amount=? WHERE rowid=?',
        [this.data.date, this.data.type, this.data.description, this.data.amount, this.data.rowid])
        .then(res => {
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        }).catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDataPage');
  }

}
