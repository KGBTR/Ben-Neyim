export type Submission = {
  Title: string
  SelfText: string
  IsDeleted: {
    ByModerator: boolean
    ByAuthor: boolean
  }
  FullLink: string
  Score: number
  Flair: {
    BackgroundColor: string
    TextColor: string
    Text: string
  }
  // Images: Array<string> // TODO: Thumbnail change to images via carrousel
  Thumbnail: {
    URL: string
    Width: number
    Height: number
  }
  PublishDate: {
    Raw: Date
    Formatted: string
  }
  RetrievedOn: number
}

export type SubmissionRaw = {
  created_utc: number
  full_link: string
  score: number
  link_flair_background_color: string
  link_flair_text: string
  link_flair_text_color: string
  retrieved_on: number
  over_18: boolean
  spoiler: boolean
  thumbnail: string
  thumbnail_height: number
  thumbnail_width: number
  title: string
  selftext: string
}