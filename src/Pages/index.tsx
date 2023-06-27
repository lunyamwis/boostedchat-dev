import React from "react";
import {
  Basket,
  Hash,
  Icon,
  MapPin,
  Message2,
  Phone,
  Photo,
  Users,
  Video,
  VideoPlus,
} from "tabler-icons-react";

export type PrimaryPageData = {
  group: EGroup;
  title: string;
  isNavItem: boolean;
  url?: string;
};

type Level1 =
  | {
      hasChildren: true;
      icon: Icon;
      children: ChildKeys[];
    }
  | {
      hasChildren: false;
      url: string;
      icon: Icon;
    };

export type TPageData = PrimaryPageData &
  (({ level: "1" } & Level1) | { level: "2"; url: string });

export type ParentKeys =
  | "Accounts"
  | "Photos"
  | "Videos"
  | "Reels"
  | "Stories"
  | "Comments"
  | "Hashtags"
  | "GoogleMapsScrapper"
  | "StyleSeatScrapper";

export type ChildKeys =
  | "CreateAccount"
  | "AccountsList"
  | "AccountFollowers"
  | "BulkUploadAccounts"
  | "CreatePhoto"
  | "PhotosList"
  | "PhotoLikers"
  | "BulkUploadPhotos"
  | "CreateVideo"
  | "VideosList"
  | "VideoLikers"
  | "BulkUploadVideos"
  | "CreateReel"
  | "ReelsList"
  | "ReelLikers"
  | "BulkUploadReels"
  | "CreateStory"
  | "StoriesList"
  | "StoryViewers"
  | "BulkUploadStories"
  | "CreateHashtag"
  | "HashtagsList"
  | "BulkUploadHashtags"
  | "CreateComment"
  | "CommentsList"
  | "ScrapStyleseat"
  | "ScrapGoogleMaps";

type TMPageData = Record<ParentKeys | ChildKeys, TPageData>;

export enum EGroup {
  instagram = "Instagram",
  scrapper = "Scrapper",
}

export const componentData: {
  key: keyof TMPageData;
  component: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  {
    key: "CreateAccount",
    component: React.lazy(() =>
      import("./Instagram/Account/CreateAccount").then(({ CreateAccount }) => ({
        default: CreateAccount,
      }))
    ),
  },
  {
    key: "AccountsList",
    component: React.lazy(() =>
      import("./Instagram/Account/Accounts").then(({ Accounts }) => ({
        default: Accounts,
      }))
    ),
  },
  {
    key: "BulkUploadAccounts",
    component: React.lazy(() =>
      import("./Instagram/Account/BulkUploadAccounts").then(
        ({ BulkUploadAccounts }) => ({
          default: BulkUploadAccounts,
        })
      )
    ),
  },
  {
    key: "AccountFollowers",
    component: React.lazy(() =>
      import("./Instagram/Account/AccountFollowers").then(
        ({ AccountFollowers }) => ({
          default: AccountFollowers,
        })
      )
    ),
  },
  {
    key: "CreatePhoto",
    component: React.lazy(() =>
      import("./Instagram/Photo/CreatePhoto").then(({ CreatePhoto }) => ({
        default: CreatePhoto,
      }))
    ),
  },
  {
    key: "PhotosList",
    component: React.lazy(() =>
      import("./Instagram/Photo/Photos").then(({ Photos }) => ({
        default: Photos,
      }))
    ),
  },
  {
    key: "PhotoLikers",
    component: React.lazy(() =>
      import("./Instagram/Photo/PhotoLikers").then(({ PhotoLikers }) => ({
        default: PhotoLikers,
      }))
    ),
  },
  {
    key: "BulkUploadPhotos",
    component: React.lazy(() =>
      import("./Instagram/Photo/BulkUploadPhotos").then(
        ({ BulkUploadPhotos }) => ({
          default: BulkUploadPhotos,
        })
      )
    ),
  },
  {
    key: "CreateVideo",
    component: React.lazy(() =>
      import("./Instagram/Video/CreateVideo").then(({ CreateVideo }) => ({
        default: CreateVideo,
      }))
    ),
  },
  {
    key: "VideosList",
    component: React.lazy(() =>
      import("./Instagram/Video/Videos").then(({ Videos }) => ({
        default: Videos,
      }))
    ),
  },
  {
    key: "VideoLikers",
    component: React.lazy(() =>
      import("./Instagram/Video/VideoLikers").then(({ VideoLikers }) => ({
        default: VideoLikers,
      }))
    ),
  },
  {
    key: "BulkUploadVideos",
    component: React.lazy(() =>
      import("./Instagram/Video/BulkUploadVideos").then(
        ({ BulkUploadVideos }) => ({
          default: BulkUploadVideos,
        })
      )
    ),
  },
  {
    key: "CreateReel",
    component: React.lazy(() =>
      import("./Instagram/Reel/CreateReel").then(({ CreateReel }) => ({
        default: CreateReel,
      }))
    ),
  },
  {
    key: "ReelsList",
    component: React.lazy(() =>
      import("./Instagram/Reel/Reels").then(({ Reels }) => ({
        default: Reels,
      }))
    ),
  },
  {
    key: "ReelLikers",
    component: React.lazy(() =>
      import("./Instagram/Reel/ReelLikers").then(({ ReelLikers }) => ({
        default: ReelLikers,
      }))
    ),
  },
  {
    key: "BulkUploadReels",
    component: React.lazy(() =>
      import("./Instagram/Reel/BulkUploadReels").then(
        ({ BulkUploadReels }) => ({
          default: BulkUploadReels,
        })
      )
    ),
  },
  {
    key: "CreateStory",
    component: React.lazy(() =>
      import("./Instagram/Story/CreateStory").then(({ CreateStory }) => ({
        default: CreateStory,
      }))
    ),
  },
  {
    key: "StoriesList",
    component: React.lazy(() =>
      import("./Instagram/Story/Stories").then(({ Stories }) => ({
        default: Stories,
      }))
    ),
  },
  {
    key: "StoryViewers",
    component: React.lazy(() =>
      import("./Instagram/Story/StoryViewers").then(({ StoryViewers }) => ({
        default: StoryViewers,
      }))
    ),
  },
  {
    key: "BulkUploadStories",
    component: React.lazy(() =>
      import("./Instagram/Story/BulkUploadStories").then(
        ({ BulkUploadStories }) => ({
          default: BulkUploadStories,
        })
      )
    ),
  },
  {
    key: "CreateComment",
    component: React.lazy(() =>
      import("./Instagram/Comment/CreateComment").then(({ CreateComment }) => ({
        default: CreateComment,
      }))
    ),
  },
  {
    key: "CommentsList",
    component: React.lazy(() =>
      import("./Instagram/Comment/Comments").then(({ Comments }) => ({
        default: Comments,
      }))
    ),
  },
  {
    key: "CreateHashtag",
    component: React.lazy(() =>
      import("./Instagram/Hashtag/CreateHashtags").then(
        ({ CreateHashtag }) => ({
          default: CreateHashtag,
        })
      )
    ),
  },
  {
    key: "HashtagsList",
    component: React.lazy(() =>
      import("./Instagram/Hashtag/Hashtags").then(({ Hashtags }) => ({
        default: Hashtags,
      }))
    ),
  },
  {
    key: "BulkUploadHashtags",
    component: React.lazy(() =>
      import("./Instagram/Hashtag/BulkUploadHashtags").then(
        ({ BulkUploadHashtags }) => ({
          default: BulkUploadHashtags,
        })
      )
    ),
  },
  {
    key: "ScrapGoogleMaps",
    component: React.lazy(() =>
      import("./Scrapper/GoogleMaps/Form").then(({ StartGMapsScrapper }) => ({
        default: StartGMapsScrapper,
      }))
    ),
  },
  {
    key: "ScrapStyleseat",
    component: React.lazy(() =>
      import("./Scrapper/StyleSeat/Form").then(({ ScrapStyleSeat }) => ({
        default: ScrapStyleSeat,
      }))
    ),
  },
];

export const pageData: TMPageData = {
  Accounts: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: true,
    title: "Accounts",
    isNavItem: true,
    children: ["AccountsList", "CreateAccount", "BulkUploadAccounts"],
    icon: Users,
  },
  CreateAccount: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Account",
    isNavItem: true,
    url: "/create-account",
  },
  AccountsList: {
    level: "2",
    group: EGroup.instagram,
    title: "Accounts List",
    isNavItem: true,
    url: "/accounts",
  },
  BulkUploadAccounts: {
    level: "2",
    group: EGroup.instagram,
    title: "Bulk Upload",
    isNavItem: true,
    url: "/upload-accounts",
  },
  AccountFollowers: {
    level: "2",
    group: EGroup.instagram,
    title: "Followers",
    isNavItem: false,
    url: "accounts/:id/followers/",
  },
  Photos: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: true,
    title: "Photos",
    isNavItem: true,
    children: ["CreatePhoto", "PhotosList", "BulkUploadPhotos"],
    icon: Photo,
  },
  CreatePhoto: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Photo",
    isNavItem: true,
    url: "/create-photo",
  },
  PhotosList: {
    level: "2",
    group: EGroup.instagram,
    title: "Photos List",
    isNavItem: true,
    url: "/photos",
  },
  BulkUploadPhotos: {
    level: "2",
    group: EGroup.instagram,
    title: "Bulk Upload",
    isNavItem: true,
    url: "/upload-photos",
  },
  PhotoLikers: {
    level: "2",
    group: EGroup.instagram,
    title: "Photo likers",
    isNavItem: false,
    url: "photos/:id/likers",
  },
  Videos: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: true,
    title: "Videos",
    isNavItem: true,
    children: ["CreateVideo", "VideosList", "BulkUploadVideos"],
    icon: Video,
  },
  CreateVideo: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Video",
    isNavItem: true,
    url: "/create-video",
  },
  VideosList: {
    level: "2",
    group: EGroup.instagram,
    title: "Videos List",
    isNavItem: true,
    url: "/videos",
  },
  VideoLikers: {
    level: "2",
    group: EGroup.instagram,
    title: "Video likers",
    isNavItem: false,
    url: "videos/:id/likers",
  },
  BulkUploadVideos: {
    level: "2",
    group: EGroup.instagram,
    title: "Bulk Upload",
    isNavItem: true,
    url: "/upload-videos",
  },
  Reels: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: true,
    title: "Reels",
    isNavItem: true,
    children: ["CreateReel", "ReelsList", "BulkUploadReels"],
    icon: VideoPlus,
  },
  CreateReel: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Reel",
    isNavItem: true,
    url: "/create-reel",
  },
  ReelsList: {
    level: "2",
    group: EGroup.instagram,
    title: "Reels List",
    isNavItem: true,
    url: "/reels",
  },
  BulkUploadReels: {
    level: "2",
    group: EGroup.instagram,
    title: "Bulk Upload",
    isNavItem: true,
    url: "/upload-Reels",
  },
  ReelLikers: {
    level: "2",
    group: EGroup.instagram,
    title: "Reel likers",
    isNavItem: false,
    url: "reels/:id/likers",
  },
  Stories: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: true,
    title: "Stories",
    isNavItem: true,
    children: ["CreateStory", "StoriesList", "BulkUploadStories"],
    icon: Phone,
  },
  CreateStory: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Story",
    isNavItem: true,
    url: "/create-story",
  },
  StoriesList: {
    level: "2",
    group: EGroup.instagram,
    title: "Stories List",
    isNavItem: true,
    url: "/stories",
  },
  StoryViewers: {
    level: "2",
    group: EGroup.instagram,
    title: "Story viewers",
    isNavItem: false,
    url: "stories/:id/viewers",
  },
  BulkUploadStories: {
    level: "2",
    group: EGroup.instagram,
    title: "Bulk Upload",
    isNavItem: true,
    url: "/upload-stories",
  },
  Comments: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: true,
    title: "Comments",
    isNavItem: true,
    children: ["CommentsList", "CreateComment"],
    icon: Message2,
  },
  CreateComment: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Comment",
    isNavItem: true,
    url: "/create-comment",
  },
  CommentsList: {
    level: "2",
    group: EGroup.instagram,
    title: "Comments List",
    isNavItem: true,
    url: "/comments-list",
  },
  Hashtags: {
    level: "1",
    group: EGroup.instagram,
    hasChildren: true,
    title: "Hashtags",
    isNavItem: true,
    children: ["CreateHashtag", "HashtagsList", "BulkUploadHashtags"],
    icon: Hash,
  },
  CreateHashtag: {
    level: "2",
    group: EGroup.instagram,
    title: "Create Hashtag",
    isNavItem: true,
    url: "/create-hashtag",
  },
  BulkUploadHashtags: {
    level: "2",
    group: EGroup.instagram,
    title: "Bulk Upload",
    isNavItem: true,
    url: "/upload-hashtags",
  },
  HashtagsList: {
    level: "2",
    group: EGroup.instagram,
    title: "Hashtags List",
    isNavItem: true,
    url: "/hashtags-list",
  },
  GoogleMapsScrapper: {
    level: "1",
    group: EGroup.scrapper,
    hasChildren: true,
    title: "Google Maps Scrapper",
    isNavItem: true,
    children: ["ScrapGoogleMaps"],
    icon: MapPin,
  },
  StyleSeatScrapper: {
    level: "1",
    group: EGroup.scrapper,
    hasChildren: true,
    title: "Styleseat Scrapper",
    isNavItem: true,
    children: ["ScrapStyleseat"],
    icon: Basket,
  },
  ScrapGoogleMaps: {
    level: "2",
    group: EGroup.scrapper,
    title: "Scrap",
    isNavItem: true,
    url: "/google-maps/scrap",
  },
  ScrapStyleseat: {
    level: "2",
    group: EGroup.scrapper,
    title: "Scrap",
    isNavItem: true,
    url: "/styleseat/scrap",
  },
};
