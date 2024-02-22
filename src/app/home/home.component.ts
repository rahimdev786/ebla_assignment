import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentComponent } from '../student/student.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StudentapiService } from '../service/studentapi.service';
import { CoreService } from '../core/core.service';
import { Student } from '../models/studentmodel';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'age', 'gender', 'dob', 'section', 'class',
      'year', 'english', 'maths', 'physic', 'action'];
    section: string[] = ['primary', 'secondary'];
    year: string[] = [];
    classOption: string[] = [];
    selectSections: string = ''
    selectedYear: string = ''
    selectedClass: string = ''
    studentData: Student[] = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
    constructor(private _dialogue: MatDialog,
        private _service: StudentapiService, private _message:CoreService ) { }
    
    ngOnInit(){
        this.getAllListOfStudent();
    }
    openDialogForstudent() {
        const dialougeRef = this._dialogue.open(StudentComponent);
        dialougeRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                   this.getAllListOfStudent() 
                }
            },
            error:console.log
        })
    }
    getAllListOfStudent() {
        this._service.getAllStudent().subscribe({
            next: (val) => {
                this.dataSource = new MatTableDataSource(val);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
                this.studentData = val
            },
            error: console.log
        });
    }

    deleteByIdToStudent(id: number) {
        this._service.deleteById(id).subscribe({
            next: (val) => {
                this._message.openSnackBar('deleted sucess')
                this.getAllListOfStudent()
            },
            error:console.log
        });
    }


    onEditAction(data:any) {
       const dialougeRef =  this._dialogue.open(StudentComponent, {
            data: data
        })
        dialougeRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                   this.getAllListOfStudent() 
                }
            },
            error:console.log
        })
    }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
        }
    }

    onSelectSection() {
        if (this.selectSections == 'primary') {
            this.classOption = ['KG', 'Class1', 'Class2', 'Class3', 'Class4','Class5'];
            this.year = ['2021', '2022', '2023', '2024'];
        } else {
            this.classOption = ['Class6', 'Class7', 'Class8','Class9','Class10'];
            this.year = ['2021', '2022', '2023', '2024'];
        }  
    }

    submitValueToTable() {
        console.log(this.selectSections)
        console.log(this.selectedClass)
        console.log(this.selectedYear)
       const filteredData = this.studentData.filter(student => {
           return student.section === this.selectSections && student.class === this.selectedClass && student.year === this.selectedYear;
       });
        console.log(filteredData)
        this.dataSource = new MatTableDataSource(filteredData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    restTable() {
        this.selectSections = ""
        this.selectedClass = ""
        this.selectedYear = ""
      this.getAllListOfStudent()
    }
}


