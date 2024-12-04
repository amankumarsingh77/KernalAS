import * as React from "react"

import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import { cloudproviders } from "../lib/helpers/cloudproviders";
export function CarouselHome() {
    return (
        <div className="p-3 mb-5">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-10  text-gray-900 text-center">Cloud Providers</h1>
            <div className="flex flex-wrap item-center justify-center rounded gap-20 p-4">

                {cloudproviders.map((cloud) => {
                    return (
                        <Card
                            key={cloud.name}
                            isFooterBlurred
                            radius="lg"
                            className="border-none"
                        >
                            <Image
                                alt={cloud.name}
                                className="object-cover"
                                height={100}
                                src={cloud.image}
                                width={100}
                            />
                            {!cloud.available &&
                                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 text-center">
                                    <p className="text-tiny text-black/80  flex">Available soon.</p>
                                </CardFooter>
                            }
                            <h2 className="p-1.5 text-center font-medium title-font mb-2">{cloud.name}</h2>

                        </Card>
                    )
                })}

            </div>
        </div>
    )
}
