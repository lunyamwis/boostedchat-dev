export interface Outreach {
  id: number,
  name: string,
  task: string,
  args: string,//"[[\"javad_picasso\"], \"\"]",
  kwargs: {},
  queue:  string | null,
  exchange: string | null,
  routing_key: string | null,
  headers: {},
  priority: string | null,
  expires: string | null,
  expire_seconds: string | null,
  one_off: boolean,
  start_time: string | null,
  enabled: boolean,
  last_run_at: string | null,
  total_run_count: number,
  date_changed: string | null,
  description: string | null,
  interval: string | null,
  crontab: number,
  solar: string | null,
  clocked: string | null,
}


