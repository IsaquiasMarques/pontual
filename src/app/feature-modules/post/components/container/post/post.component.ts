import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostFacade } from '../../../facades/post.facade';
import { AdsModel } from '@core/base-models/ads.model';
import { PostsModel } from '@core/base-models/posts.model';
import { map } from 'rxjs';
import { ScreenDimentions } from '@core/services/window/screen-dimentions.service';
import { PONTUAL_TEAM, PontualTeam, ROLE_IN_CASE_POST_OWNER_IS_CHAT_GPT, USER_ROLE_FROM_BACKOFFICE_NOT_INCLUDED_ON_PONTUAL_TEAM } from '@core/mock/team.mock';
import { MetaTagsService } from '@shared/services/meta/meta-tags.service';
import { isPlatformBrowser } from '@angular/common';
import { AboutDataCenter } from '@core/services/data/datacenter.service';
import { pontualTeamDataTransformer } from 'src/app/feature-modules/about/services/transformer/team';

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
    private metaTagService: MetaTagsService,
    @Inject(PLATFORM_ID) private platformId: any,
    private _ngZone: NgZone,
    private aboutDataCenter: AboutDataCenter
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
      return ROLE_IN_CASE_POST_OWNER_IS_CHAT_GPT; // Inteligência Artificial
    }
    
    let findedPerson: PontualTeam | 'not-found' = (pontualTeamDataTransformer(this.aboutDataCenter.team.getValue()) ?? PONTUAL_TEAM).find( (person: PontualTeam) => person.name === personName ) ?? 'not-found';

    if(findedPerson == 'not-found'){
      return USER_ROLE_FROM_BACKOFFICE_NOT_INCLUDED_ON_PONTUAL_TEAM; // Jornalista
    }

    return findedPerson.role;
  }

  sharerFacebook(){
    if(isPlatformBrowser(this.platformId)){
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}%2F&amp;src=sdkpreparse`, '_blank')
    }
  }

  sharerTwitter(){
    if(isPlatformBrowser(this.platformId)){
      this._ngZone.runOutsideAngular(() => {
        window.open(`https://twitter.com/intent/tweet?text=${window.location.href}`, '_blank');
      });
    }
  }

  sharerLinkedin(){
    if(isPlatformBrowser(this.platformId)){
      this._ngZone.runOutsideAngular(() => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?mini=true&url=${window.location.href}`, '_blank');
      });
    }
  }

}
