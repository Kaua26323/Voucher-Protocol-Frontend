interface VouchersProps{
  id:          string;
  date:        string;
  type:        string;
  isComplete:  boolean;
  description: string | null;
  lastUser:    string;
}

export type { VouchersProps };