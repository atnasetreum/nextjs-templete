export interface CostCenter {
  id: string;
  site: string;
  carrier: string;
  provider: string;
  coverage: string;
  service: string;
  notation: string[];
  version: number;
  current_version: boolean;
  status: string;
  start_date: string;
  end_date: string;
  file_name: string;
  url: string;
  bucket: string;
  gs: string;
  id_group: number;
  enviroment: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
