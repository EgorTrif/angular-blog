import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
 
  posts: Post[] = []
  pSub: Subscription
  dSub: Subscription
  searchPosts = ''

  constructor(private postsService: PostsService,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => {
    this.posts = posts
    })
  }

  remove(id: string){
    if(confirm("Are you sure to delete this post?")) {
      this.postsService.remove(id).subscribe(() => {
        this.posts = this.posts.filter(post => post.id !== id)
        this.alertService.danger('Post was deleted')
      })
    }
  }

  ngOnDestroy(): void {
    if(this.pSub){
      this.pSub.unsubscribe()
    }
    if(this.dSub){
      this.dSub.unsubscribe()
    }

  }

}
