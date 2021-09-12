import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from './../../interface.component';
import 'rxjs/operator/catch.js'
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from './../../common/Not-Found-Error';
import { BadRequest } from './../../common/bad-request';
@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = []
  post = {
    id: '',
    userId: '',
    title: '',
    body: ''

  }
  status: boolean = true
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPost()
  }


  getPost() {

    this.postService.getALL()
      .subscribe((posts: any) => this.posts = posts,
        (error: AppError) => {
          if (error instanceof NotFoundError) {
            alert("les donner n'exit pas")
          }
          else {
            alert('unexpected error')
          }
        })
  }

  createPoste() {

    this.postService.create(this.post)
      .subscribe(newPost => {
        this.post.id = newPost.id
        this.posts = [newPost, ...this.posts]
        this.post = {
          id: '',
          userId: '',
          title: '',
          body: ''
        }

      }, (error: AppError) => {

        if (error instanceof BadRequest) {

          alert('merci de verefier votre information')
        }
        else {
          alert('error inatendu')
        }

      }
      )

  }

  EditPost(post: any) {

    this.post = post
    this.status = false
  }

  UpdatePost() {

    return this.postService.Update(this.post)
      .subscribe(() => {

        this.status = true
        this.post = {
          id: '',
          userId: '',
          title: '',
          body: ''
        }
      }, (error: AppError) => {

        if (error instanceof BadRequest || error instanceof NotFoundError) {
          alert('merci de véréfier votre information')
        }
        else {
          alert('unexpected error')
        }
      }
      )
  }

  DeletePost(post: Post) {

    this.postService.delete(post)
      .subscribe(() => {
        let index = this.posts.indexOf(post)
        this.posts.splice(index, 1)

      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('ce post est déja supprimé')
        }
        else {
          alert('error inatendu')
        }
      })
  }

}
