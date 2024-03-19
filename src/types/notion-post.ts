
export interface INotionTag{
  name: string
}

export interface INotionPost {
  id: string;
  properties: {
    Title: { title: [{ plain_text: string }] },
    Tags: {
      multi_select: [{ name: string }]
    },
    Description: {
      rich_text: [{ plain_text: string }]
    }
    Date: {
      last_edited_time: string
    }
    Slug: {
      rich_text: [{ plain_text: string }]
    }
  }
}