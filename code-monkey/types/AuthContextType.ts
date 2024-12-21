export default interface AuthContextType {
  myId: number;
  username: string;
  reloadSignal: number;
  setReloadSignal: React.Dispatch<React.SetStateAction<number>>;
}
