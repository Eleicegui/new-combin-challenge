import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-new-member-form',
  templateUrl: './new-member-form.component.html',
  styleUrls: ['./new-member-form.component.css']
})
export class NewMemberFormComponent implements OnInit {
  public member_form: FormGroup;
	public ssn_mask = [/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];

  constructor(
    private _formBuilder: FormBuilder,
    private _dataService: DataService,
    ) { }

  ngOnInit(): void {
    this.generateForm();
  }

  generateForm(){
		this.member_form = this._formBuilder.group({
			firstName	  	: ['',[Validators.required, this._dataService.trimmedLength(2)]],
			lastName       : ['',[Validators.required, this._dataService.trimmedLength(2)]],
			address		      : ['',[Validators.required, this._dataService.trimmedLength(2)]],
			ssn		          : ['',[Validators.required, Validators.pattern("^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$"), this._dataService.noDuplicatedSSN()]],
		});
	}

  resetForm(){
    this.member_form.reset();
		Object.keys(this.member_form.controls).forEach(key => {
			this.member_form.controls[key].clearValidators();
			this.member_form.controls[key].markAsUntouched();
      this.member_form.controls[key].updateValueAndValidity();
		});
  }

  submitForm(){
    this._dataService.setMember(this.member_form.getRawValue());
  }

}
