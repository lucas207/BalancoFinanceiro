import { SQLiteObject } from '@ionic-native/sqlite';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BancoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BancoProvider {

  constructor() {
    console.log('Hello BancoProvider Provider');
  }

  CreateTableIfNoExist(db: SQLiteObject) {
    db.executeSql('CREATE TABLE IF NOT EXISTS expense(rowid INTEGER PRIMARY KEY, date TEXT, type TEXT, description TEXT, amount INT)', [])
      .then(res => console.log('Executed SQL', res))
      .catch(e => console.log(e));
  }

  SelectAll(db: SQLiteObject) {
    return db.executeSql('SELECT * FROM expense ORDER BY rowid DESC', [])
      .then(res => {
        console.log('select all', res);
        var expenses = [];
        for (let i = 0; i < res.rows.length; i++) {
          console.log('tem no banco', res.rows.item(i).description);
          expenses.push({
            rowid: res.rows.item(i).rowid, date: res.rows.item(i).date, type: res.rows.item(i).type,
            description: res.rows.item(i).description, amount: res.rows.item(i).amount
          })
        }
        return expenses;
      }).catch(e => console.log(e));
  }

  CalculaExpense(db: SQLiteObject): any {
    return db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', [])
      .then(res => {
        console.log('calcula Expense', res);
        if (res.rows.length > 0) {
          return parseInt(res.rows.item(0).totalExpense);
          // this.balance = this.totalIncome - this.totalExpense;
        }
      })
  }

  CalculaIncome(db: SQLiteObject): any {
    return db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', [])
      .then(res => {
        console.log('calcula Income', res);
        if (res.rows.length > 0) {
          return parseInt(res.rows.item(0).totalIncome);
          // this.balance = this.totalIncome - this.totalExpense;
        }
      }).catch(e => console.log(e))
  }

}
