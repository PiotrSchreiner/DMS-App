export type Database = {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          file_path: string;
          file_type: string | null;
          size_kb: number | null;
        };
      };
    };
  };
};
