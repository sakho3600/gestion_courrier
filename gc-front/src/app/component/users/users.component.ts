import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {User} from '../../_models/user';
import {MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['login', 'nom', 'prenom', 'email', 'role'];
  dataSource = new MatTableDataSource<any>();
  animal: string;
  name: string;

  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadUsersList();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadUsersList() {
    this.userService.getAll()
        .subscribe(
            data => {
                console.log("hello world !" + data);
                this.dataSource = new MatTableDataSource<User>(data);
            },
            error => console.log('loadUsersList Method: ' + <any>error, 'alert alert-danger')
        );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(): void {
    let dialogRef1 = this.dialog.open(AddUserDialog, { data: { title: 'First Dialog' } });
  
    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog 1 was closed');
    });
    
    let dialogRef2 = this.dialog.open(AddUserDialog, { data: { title: 'Second Dialog' } });
  
    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog 1 was closed');
    });
  }

}

@Component({
  selector: 'add-user-dialog',
  /**template: `
    <h1>{{data.title}}</h1>
    <button mat-raised-button (click)="dialogRef.close()">close</button>
  `**/
  templateUrl : './add-user-dialog.html'
})
export class AddUserDialog {
  
  constructor(public dialogRef: MatDialogRef<AddUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    console.log(this.dialogRef)
    this.dialogRef.close();
  }

}