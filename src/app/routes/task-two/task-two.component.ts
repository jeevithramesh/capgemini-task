import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IUser, TaskTwoService } from 'src/app/services/task-two.service';

@Component({
  selector: 'app-task-two',
  templateUrl: './task-two.component.html',
  styleUrls: ['./task-two.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class TaskTwoComponent implements OnInit {
  public usersList: IUser[] = [];

  public ageCategories = ['0 - 18', '19 - 30', '31 - 50', '50+'];

  public genders = ['Male', 'Female', 'Prefer not to say'];

  public userFormGroup: FormGroup | undefined;

  public searchControl = new FormControl('');

  public searchString = '';

  constructor(
    private t2Service: TaskTwoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      name: new FormControl<string>('', Validators.required),
      age: new FormControl<string>('0 - 18', Validators.required),
      gender: new FormControl<string>('Male', Validators.required),
      currentHobby: new FormControl<string>(''),
      hobbies: new FormControl<string[]>([], Validators.required),
      verification: new FormControl<[]>([], Validators.required),
    });
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((val) => {
        this.searchString = (val || '').toLowerCase();
      });

    this.loadUsers();
  }

  loadUsers() {
    this.t2Service.getUsers().subscribe((users) => {
      this.usersList = users;
    });
  }

  getFormValue(controlName: string) {
    return this.userFormGroup?.get(controlName)?.value;
  }

  isFormControlInvalid(controlName: string) {
    if (controlName === 'currentHobby') {
      return Boolean(
        !this.getFormValue('hobbies')?.length &&
          this.userFormGroup?.get(controlName)?.touched
      );
    }
    return Boolean(
      this.userFormGroup?.get(controlName)?.touched &&
        this.userFormGroup?.get(controlName)?.invalid
    );
  }

  addHobby() {
    let currentHobby = this.userFormGroup?.get('currentHobby')?.value;
    if (currentHobby && !this.getFormValue('hobbies').includes(currentHobby)) {
      this.userFormGroup
        ?.get('hobbies')
        ?.setValue([...this.getFormValue('hobbies'), currentHobby]);
    }
  }
  removeHobby(hobby: string) {
    this.userFormGroup
      ?.get('hobbies')
      ?.setValue([
        ...this.getFormValue('hobbies').filter((h: string) => h !== hobby),
      ]);
  }

  addUser() {
    if (!this.userFormGroup?.invalid && this.getFormValue('hobbies').length) {
      let curUser: IUser = {
        name: this.getFormValue('name'),
        age: this.getFormValue('age'),
        gender: this.getFormValue('gender'),
        hobbies: this.getFormValue('hobbies'),
        verification: this.getFormValue('verification'),
        id: new Date().getTime().toString(),
      };
      this.t2Service.addTask(curUser).subscribe((users) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'User added successfully',
        });
        this.usersList = users;
        this.resetInputs();
        this.userFormGroup?.markAsUntouched();
        this.userFormGroup?.markAsPristine();
      });
    } else {
      this.userFormGroup?.markAsTouched();
    }
  }

  removeUser(id: string) {
   
    this.t2Service.deleteUser(id).subscribe(() => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Success',
        detail: 'User removed successfully',
      });
      this.loadUsers();
    });
  }

  showRemoveDialog(username: string, id: string) {
    this.confirmationService.confirm({
      message: `Are you sure you want to remove ${username}'s record?`,
      accept: () => {
        this.removeUser(id);
      },
    });
    
  }

  resetInputs() {
    this.userFormGroup?.patchValue({
      name: '',
      age: '0 - 18',
      gender: 'Male',
      currentHobby: '',
      hobbies: [],
      verification: [],
    });
    this.userFormGroup?.markAsUntouched();
  }

  get getUsersList() {
    if (this.searchString.length) {
      return this.usersList.filter((entry) =>
        entry.name.toLowerCase().includes(this.searchString)
      );
    }
    return this.usersList;
  }
}
