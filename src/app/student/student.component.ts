import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { StudentapiService } from '../service/studentapi.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { CoreService } from '../core/core.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
    section: string[] = ['primary', 'secondary'];
    year: string[] = ['2021', '2022', '2023', '2024'];
    classOption: string[] = [];
    selectSections:string = ''  

    empform!: FormGroup;
    constructor(private _fb: FormBuilder,
        private _service: StudentapiService,
        private _dialouage: MatDialogRef<StudentComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private _message: CoreService) { 
        this.formCreate()
    }
    
   ngOnInit(): void {
       this.empform.patchValue(this.data)  
   }
    
    formCreate() {
        this.empform =this._fb.group({
            name: [''],
            age: [''],
            gender: [''],
            dob: [''],
            section: [''],
            class: [''],
            year: [''],
            english: [''],
            maths: [''],
            physic: [''],
        });
    }

    onFormSubmit() {
        if (this.empform.valid) {

            if (this.data) {
                this._service.updatebyID(this.data.id, this.empform.value).subscribe({
                    next: (val: any) => {
                        this._message.openSnackBar('sucess update');
                        this._dialouage.close(true);
                    },
                    error: (err) => {
                        console.log("error when add", err)
                    }
                });
            } else {
                this._service.addStudent(this.empform.value).subscribe({
                    next: (val: any) => {
                        this._message.openSnackBar('sucess insert');
                        this._dialouage.close(true);
                    },
                    error: (err) => {
                        console.log("error when add", err)
                    }
                });
            }
        }
    } 

    onSelectSection() {
        console.log(this.selectSections)
        if (this.selectSections == 'primary') {
            this.classOption = ['KG', 'Class1', 'Class2', 'Class3', 'Class4','Class5'];
        } else {
             this.classOption = ['Class6', 'Class7', 'Class8','Class9','Class10'];
        }  
    }
}
