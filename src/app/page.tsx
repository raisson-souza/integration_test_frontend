"use client"

import Box from "@/components/base/Box"
import Header from "@/components/base/screen/header"
import Link from "next/link"
import Screen from "@/components/base/Screen"
import Section from "@/components/base/screen/section"
import { useEffect, useState } from "react"
import Service from "@/services/api/Service"

export default function HomeScreen() {
  const [products,setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await Service.List().then((response) => {
          if (response.Success) {
            setProducts(response.Data)
          } else {
            window.alert(`Error fetching products: ${response.ErrorMessage}`)
          }
        })
      } catch (error) {
        window.alert(`Error fetching products: ${(error as Error).message}`)
      }
    }

    fetchProducts()
  }, [])

  return (
    <Screen
      headerComponent={ <Header /> }
      sectionComponent={ <Section /> }
    >
      <Box.Column>
        <h1>Project Template Web</h1>
        <Box.Row>
          {
            products.length === 0
              ? <p>carregando</p>
              : products.map((product) =>
                <Box.Column key={ product.id }>
                  <p>{ product.name }</p>
                  <p>{ product.description }</p>
                </Box.Column>
              )
          }
        </Box.Row>
      </Box.Column>
    </Screen>
  )
}