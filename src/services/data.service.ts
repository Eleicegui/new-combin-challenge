import { EventEmitter, Injectable, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Member } from 'src/models/member';
import { MembersService } from './members.service';

@Injectable()
export class DataService {
    @Output() new_members = new EventEmitter<any>();
    private members: Member[];

  constructor(
        private _membersService: MembersService,
    ) 
    {}

    getMembers(): Promise<Member[]>{
        return new Promise<Member[]>(
            (resolve) => {
                if(this.members){
                    resolve(this.members);
                }else{
                    this._membersService.getMembers().subscribe(
                        (response) => {
                          this.members = response;
                          resolve(this.members);
                        },
                        (error) => {
                          console.log(error);
                        }
                      )
                }
            }
        )
    }

    public refreshMembersList(){
        this._membersService.getMembers().subscribe(
            (response) => {
              this.members = response;
              this.new_members.emit();
            },
            (error) => {
              console.log(error);
            }
          )
    }

    setMember(payload){
        this._membersService.setMember(payload).subscribe(
            (response) => {
                this.members.push(response);
                this.new_members.emit();
            },
            (error) => {
                console.log(error);
            }
        )
    }

    newMemberEmitter(){
        return this.new_members;
    }

    noDuplicatedSSN(): {[key: string]: any} | null  {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            var new_ssn = control.value ? control.value?.toString() : null;
            if(new_ssn){
                let match = this.members.find( member => member.ssn == new_ssn);
                if (match) {
                    return { 'duplicatedSSN': true };
                }
            }
            return null;
        }
    }

    trimmedLength(length_expected): {[key: string]: any} | null  {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            var trimmed = control.value ? control.value?.trim() : null;
            if(trimmed){
                if(trimmed.length < length_expected){
                    return { 'trimmedLength': true };
                }
            }
            return null;
        }
    }
    
}
