import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotesService } from 'src/app/Services/notes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  token
  userID
  isNotes = false
  isLoading = false
  ResponseMessage = ""
  AllNotes = []
  isClicked = false
  constructor(private _Router: Router, private _AuthService: AuthService, private _NotesService: NotesService) {
    this.token = localStorage.getItem('TOKEN');
    this.userID = localStorage.getItem('id');
    if (!_AuthService.isLoggedIn()) {
      localStorage.clear()
      this._Router.navigate(['/signin'])

    }
    this.getAllNotes()

  }


  getAllNotes() {
    let object = {
      token: this.token,
      userID: this.userID
    }
    this._NotesService.getUserNotes(object).subscribe(response => {
      if (response.message == "not authentication or error in token") {
        localStorage.clear()
        this._Router.navigate(['/signin'])
      } else if (response.message == "no notes found") {
        this.isNotes = true
        this.ResponseMessage = response.message
        this.isLoading = true
      } else if (response.message == "success") {
        this.isLoading = true
        this.AllNotes = response.Notes
        this.isNotes = false
        $("#AddNote").modal('hide')
        $("#deleteNote").modal('hide')
        $("#EditNote").modal('hide')
        this.isClicked = false
        this.formData.reset()
      }
    })
  }

  // ============================= add new note ========================//


  formData = new FormGroup({
    title: new FormControl('', [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  })


  addNote() {
    if (this.formData.valid) {
      this.isClicked = true
      console.log(this.formData.value)
      let object = {
        token: this.token,
        citizenID: this.userID,
        title: this.formData.controls.title.value,
        desc: this.formData.controls.desc.value
      }
      this._NotesService.addNote(object).subscribe(resonse => {
        if (resonse.message = "success") {
          this.getAllNotes()

        }
        // console.log(resonse)
      })
    }

  }

  //========================= delete note =======================//
  NoteID
  noteId(id) {
    this.NoteID = id
  }

  deleteNote() {
    this.isClicked = true
    let object = {
      NoteID: this.NoteID,
      token: this.token
    }
    this._NotesService.deleteNote(object).subscribe(res => {
      if (res.message == "deleted") {
        this.getAllNotes()

      }
      // console.log(res)
    })
  }

  // ============================== edit note ============================== //
  setValue() {
    for (let i = 0; i < this.AllNotes.length; i++) {
      if (this.AllNotes[i]._id == this.NoteID) {
        this.formData.controls.title.setValue(this.AllNotes[i].title)
        this.formData.controls.desc.setValue(this.AllNotes[i].desc)
      }
    }
  }
  editNote() {
    this.isClicked = true
    let object = {
      NoteID: this.NoteID,
      token: this.token,
      title: this.formData.controls.title.value,
      desc: this.formData.controls.desc.value
    }
    this._NotesService.editNote(object).subscribe(res => {
      if (res.message == "updated") {
        this.getAllNotes()

      }
    })
  }











  ngOnInit() {
  }

}
