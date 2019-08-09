interface IMyData {
  
}

interface IMyPage {
  onLoad(options?: { [queryKey: string]: string }): void
}

Page<IMyData, IMyPage>({
  data: {
    
  },
  onLoad() {
    
  }
})
