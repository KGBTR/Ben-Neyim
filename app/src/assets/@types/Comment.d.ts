export type Comment = {
  Body: string
  FullLink: string
  PublishDate: {
    Raw: Date
    Formatted: string
  }
  ParentID: string
  RetrievedOn: number
  Score: number
  IsSubmitter: boolean
}

export type CommentRaw = {
  body: string
  permalink: string
  created_utc: number
  parent_id: string
  retrieved_on: number
  score: number
  is_submitter: boolean
}