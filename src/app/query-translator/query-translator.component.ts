import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { QueryTranslatorService } from './query-translator.service';
import { SharedService } from '../share.service';

@Component({
  selector: 'app-query-translator',
  templateUrl: './query-translator.component.html',
  styleUrls: ['./query-translator.component.css']
})
export class QueryTranslatorComponent implements OnInit {

	queryform : FormGroup;
  translators : any = [];

  constructor(fb: FormBuilder, 
  			  	  private queryTranslatorService : QueryTranslatorService,
              private shareService : SharedService,
              private router : Router
              ) { }

  ngOnInit() {
    if(!this.shareService.loginSuccess){
      alert("請登入");
      this.router.navigate(['/login']);
    }
  	this.queryTranslatorService.searchTranslator(this.queryform)
  		.then((result) => {
  			console.log("query-ngOnInit, result:", result);   
        for(var a in result){
          this.translators.push(result[a]);
        }
  		})
  		.catch((error) => {
  			console.log("query-ngOnInit, error:", error);
  		});
  }

}
