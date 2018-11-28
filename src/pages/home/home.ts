import { BancoProvider } from './../../providers/banco/banco';
import { Expense } from './../../Model/Expense';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses: any = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;

  constructor(public navCtrl: NavController, private sqlite: SQLite,
    public loadingCtrl: LoadingController, private banco: BancoProvider) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.getData();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.getData();
  }

  getData() {
    //start loading
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    //cria conection
    this.sqlite.create({
      name: 'ionicdb.db', location: 'default'
    }).then((db: SQLiteObject) => {

      this.banco.CreateTableIfNoExist(db);

      this.banco.SelectAll(db).then(res => this.expenses = res);

      this.banco.CalculaIncome(db).then(res => {
        this.totalIncome = res;
        this.balance = this.totalIncome - this.totalExpense;
      });
      this.banco.CalculaExpense(db).then(res => {
        this.totalExpense = res;
        this.balance = this.totalIncome - this.totalExpense;
      });
      
      // this.balance = this.banco.CalculaIncome(db) - this.banco.CalculaExpense(db);

      
        //desliga o loading
        loading.dismiss();
    }).catch(e => console.log(e))
  }

  addData() {
    this.navCtrl.push(AddDataPage);
  }

  editData(rowid) {
    this.navCtrl.push(EditDataPage, { rowid: rowid });
  }

  deleteData(rowid) {
    this.sqlite.create({
      name: 'ionicdb.db', location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM expense WHERE rowid=?', [rowid])
        .then(res => {
          console.log('deleted', res);
          this.getData();
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
  }

}
