'use client'

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const ViewsDisplay = ({ slug }: { slug: string }) => {
  const [views, setViews] = useState(0);

  async function getViews(): Promise<{views: number}>{
    const itens = await fetch(`/api/views/?slug=${slug}`, {
      method: 'GET',
      cache: 'force-cache',
      next: { revalidate: 3600 }
    })
    const json = await itens.json();
    return json;
  }

  const { isLoading, data } = useQuery<{views: number}>({ queryKey: [`display-views-${slug}`], queryFn: getViews })

  useEffect(() => {
    if (!isLoading) {
      if(data && typeof data.views !== "undefined"){
        setViews(data.views)
      }
    }
  }, [data, isLoading])



  return (
    <>{views && views > 0 ? <span>{isLoading ? 'carregando...' : `Visualisações: ${views}`}</span> : ''}</>
  )
}