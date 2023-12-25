import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostFacade } from '../../../facades/post.facade';
import { AdsModel } from '@core/base-models/ads.model';
import { PostsModel } from '@core/base-models/posts.model';
import { map } from 'rxjs';
import { ScreenDimentions } from '@core/services/window/screen-dimentions.service';
import { PONTUAL_TEAM, PontualTeam, ROLE_IN_CASE_POST_OWNER_IS_CHAT_GPT, USER_ROLE_FROM_BACKOFFICE_NOT_INCLUDED_ON_PONTUAL_TEAM } from '@core/mock/team.mock';
import { MetaTagsService } from '@shared/services/meta/meta-tags.service';

@Component({
  selector: 'pontual-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  imageMayAppear: boolean = false;
  ads: AdsModel[] = [];
  thePost: PostsModel = {
    imagePath: {
      fullImageSize: '',
      mediumImageSize: '',
      thumbnailImageSize: ''
    },
    title: '',
    slug: '',
    categories: [],
    created_at: ''
  }

  relatedPosts: PostsModel[] = [];
  recommendedPosts: PostsModel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private postFacade: PostFacade,
    public screenDimentions: ScreenDimentions,
    private metaTagService: MetaTagsService
  ){ }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param: any) => {
      const postSlug = param['slug'];
      this.postFacade.getPostBySlug(postSlug)
                    .pipe(
                      map((thePost: PostsModel) => {

                        this.metaTagService.addPostDetailsForSocialMediaShareProccess(thePost);

                        this.postFacade.getRelatedPosts(thePost.categories[0].id, thePost.id).subscribe((relatedPosts: PostsModel[]) => this.relatedPosts = relatedPosts)
                        return thePost;
                      })
                    )
                    .subscribe((thePost: PostsModel) => this.thePost = thePost);
        this.postFacade.getRecommendedPosts().subscribe((recommendedPosts: PostsModel[]) => this.recommendedPosts = recommendedPosts);
    });

    this.postFacade.getAdvertisements().subscribe((advertisements: AdsModel[]) => this.ads = advertisements);

  }
  
  appearWhenLoaded($event: any){
    this.imageMayAppear = true;
  }

  getPersonRoleByName(personName?: string): string{

    if(personName?.toLocaleLowerCase() === "chat-gpt"){
      return ROLE_IN_CASE_POST_OWNER_IS_CHAT_GPT;
    }
    
    let findedPerson: PontualTeam | 'not-found' = PONTUAL_TEAM.find( (person: PontualTeam) => person.name === personName ) ?? 'not-found';

    if(findedPerson == 'not-found'){
      return USER_ROLE_FROM_BACKOFFICE_NOT_INCLUDED_ON_PONTUAL_TEAM;
    }

    return findedPerson.role;
  }

}
