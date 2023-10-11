import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';
import { FirebaseService } from './firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  studentDetails: any = {
    name: '',
    age: '',
    email: '',
  };
  studentCollectiondata: any[] = [];
  showStudentList = false;
  private table: any;
  constructor(
    private firebaseService: FirebaseService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.get();
    this.firebaseService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
      this.updateStudentCollection(snapshot);
    });
  }
  ngAfterViewInit() {
    console.log('Initializing DataTables...');
    this.table = $('#myTable').DataTable({
      paging: true,
      searching: true,
      ordering: true,
      retrieve: true,
      rowReorder: true,
      colReorder: true,
      scrollY: 300,
    });
  }

  ngOnDestroy() {
    if (this.table) {
      this.table.destroy();
    }
  }

  async add() {
    const { name, age, email } = this.studentDetails;

    if (!name || !email) {
      this.openSnackBar('Name and email are required.');
    } else {
      await this.firebaseService.addStudent(name, age, email);
      this.studentDetails.name = '';
      this.studentDetails.age = '';
      this.studentDetails.email = '';
      this.openSnackBar('Student added successfully');
    }
  }
  async get() {
    const snapshot = await this.firebaseService.getStudents();
    this.updateStudentCollection(snapshot);
  }
  updateStudentCollection(snapshot: QuerySnapshot<DocumentData>) {
    this.studentCollectiondata = [];
    snapshot.docs.forEach((student) => {
      this.studentCollectiondata.push({ ...student.data(), id: student.id });
    });
  }
  async delete(docId: string) {
    const student = this.studentCollectiondata.find(
      (student) => student.id === docId
    );
    if (student) {
      await this.firebaseService.deleteStudent(docId);
      this.openSnackBar(`Record of ${student.name} deleted successfully`);
    }
  }
  async update(docId: string, name: HTMLInputElement, age: HTMLInputElement) {
    const student = this.studentCollectiondata.find(
      (student) => student.id === docId
    );
    if (student) {
      const updatedName = name.value;
      await this.firebaseService.updateStudent(docId, updatedName, age.value);
      this.openSnackBar(`Data of ${student.name} updated successfully`);
    }
  }
  toggleStudentList() {
    this.showStudentList = !this.showStudentList;
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
    });
  }
}
