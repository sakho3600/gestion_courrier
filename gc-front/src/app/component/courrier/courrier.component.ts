import { Component, OnInit, Inject } from '@angular/core';
import { CourrierService } from '../../_services/courrier.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Courrier } from '../../_models/courrier';
import { Entite } from '../../_models/entite';
import { EntiteService } from '../../_services/entite.service';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'courrier',
  templateUrl: './courrier.component.html',
  styleUrls: ['./courrier.component.css']
})
export class CourrierComponent implements OnInit {
  displayedColumns = ['reference', 'titre', 'type', 'dateCourrier', 'nature'];
  dataSource = new MatTableDataSource<any>();
  animal: string;
  name: string;

  constructor(private courrierService: CourrierService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadCourrierList();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadCourrierList() {
    this.courrierService.getAll()
      .subscribe(
      data => {
        console.log("hello world !" + data);
        this.dataSource = new MatTableDataSource<Courrier>(data);
      },
      error => console.log('loadCourrierList Method: ' + <any>error, 'alert alert-danger')
      );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openAddDialog(): void {
    let dialogRef1 = this.dialog.open(AddCourrierDialog, { data: { title: 'First Dialog' } });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog 1 was closed');
    });
  }

  openUpdateDialog(): void {
    let dialogRef1 = this.dialog.open(UpdateCourrierDialog, { data: { title: 'First Dialog' } });

    dialogRef1.afterClosed().subscribe(result => {
      console.log('The dialog 1 was closed');
    });
  }



}

@Component({
  selector: 'add-courrier-dialog',
  templateUrl: './add-courrier-dialog.html'
})
export class AddCourrierDialog {
  newCourrier:Courrier = new Courrier();
  entites: Entite[];
  
  constructor(public dialogRef: MatDialogRef<AddCourrierDialog>,public entiteService: EntiteService, public courrierService: CourrierService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    
    this.entiteService.getAll().subscribe(data => {
      this.entites = data;
    });
  }

  onNoClick(): void {
    console.log(this.dialogRef)
    this.dialogRef.close();
  }
  
   saveCourrier(): void {
    this.courrierService.create(this.newCourrier);
  }
  
}
@Component({
  selector: 'update-courrier-dialog',
  templateUrl: './update-courrier-dialog.html'
})
export class UpdateCourrierDialog {

  constructor(public dialogRef: MatDialogRef<AddCourrierDialog>, public courrierService: CourrierService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    console.log(this.dialogRef)
    this.dialogRef.close();
  }
  
  

}
