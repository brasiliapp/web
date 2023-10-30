export interface VideoLink {
  video_param: string;
  mp4_url: string;
}

export interface Speech {
  deputado: string;
  sessao: string;
  date: `${number}/${number}/${number}`;
  time: string;
  place: string;
  event_title: string;
  event_url: string;
  evento_id: number;
  video_links: VideoLink[];
}
