import {Component, Input, OnInit, OnDestroy } from "@angular/core";
import { PageEvent } from "@angular/material";
import {Post} from '../posts.model';
import { PostsService } from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    isLoading = false;
    totalPosts = 10;
    postsPerPage = 2;
    pageSizeOptions = [1,2,5,10];
    private postsSub: Subscription;

    constructor(public postsService: PostsService) {}
    
    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
            .subscribe((posts: Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }

    onChangedPage(pageData: PageEvent) {

    }
}