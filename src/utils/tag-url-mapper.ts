export const tagMapper= {
  toLabel: (tag: string) => {
    const url = tag.trim();
    if(url.includes(" ")){
      return tag.split(" ").map(tag => tag.replaceAll("_", " "))
    }else if(url.includes("+")){
      return tag.split("+").map(tag => tag.replaceAll("_", " "))
    }
    return [tag.replaceAll("_", " ")];
  },
  toURL: (tags: string[]) => {
    return tags.map(tag => tag.replaceAll(" ", "_")).join("+")
  },
  toDatabase: (tag: string) => {
    return {
      property: "Tags",
      multi_select: {
        contains: tag
      }
    }
  }
}