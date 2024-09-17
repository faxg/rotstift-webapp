"use client"
import React, { useState } from 'react';

import Image from "next/image"
import { Button } from "@ui/components/button"

import DocumentScannerComponent from "./components/DocumentScannerComponent"
import ResultViewerComponent from './components/ResultViewerComponent';
import { CogIcon, PenLineIcon, PenIcon, ClipboardPenLineIcon, SearchCheckIcon, BookOpenCheckIcon, WandSparklesIcon } from 'lucide-react';


import ClipLoader from "react-spinners/ClipLoader";



export default function Page(): JSX.Element {

  const [images, setImages] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [resultsReady, setResultsReady] = useState<boolean>(false)

  const [isCreatingRecommendations, setIsCreatingRecommendations] = useState<boolean>(false)
  const [recommendations, setRecommendations] = useState<string[]>([]);


  const analyzeImages = (images: string[]) => {
    setIsAnalyzing(true)

    setTimeout(() => {
      setIsAnalyzing(false);
      setResultsReady(true)
    }, 5000)
  }


  const createRecommendations = () => {
    setIsCreatingRecommendations(true)

    setTimeout(() => {
      const recommendations = ["Markdown for Page 1", "Markdown for Page 2"]
      setIsCreatingRecommendations(false);
      setRecommendations(recommendations)
    }, 2000)
  }


  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="flex flex-col items-center justify-between min-h-screen p-24 w-screen h-screen top-[0] absolute gradient blur-3xl opacity-30"></div>
      <div className="relative flex items-center">
        <div className="flex relative z-0 pb-16 flex-col gap-8 justify-between items-center pt-[64px]">
          <div className="z-50 flex items-center justify-center">
            <div className="absolute min-w-[614px] min-h-[614px]">
              <Image
                alt="Turborepo"
                height={614}
                src="circles.svg"
                width={614}
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div className="text-sm">
              <div className="relative flex flex-col items-center p-6 leading-relaxed text-white bg-black border border-opacity-25 bg-opacity-40 border-slate-300 rounded-xl">
                <span className="text-2xl text-red-500 font-mono">Rotstift</span> <small>Helpful AI for Teachers and students</small>

                <div>
                  <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

                    <div className="flex items-center">
                      <h1 className="text-lg font-semibold md:text-2xl">Need help on correcting essays?</h1>
                    </div>

                    <DocumentScannerComponent onImagesReady={(images: any) => setImages(images)} />

                    {images && images.length > 0 && (

                      <Button variant="default" onClick={e => analyzeImages(images)}>
                        <PenLineIcon className="mr-2 h-5 w-5" />
                        Analyze ...
                        <span className="sr-only">Analyze</span>

                      </Button>)
                    }


                    {isAnalyzing && (
                      <>
                        <ClipLoader
                          loading={isAnalyzing}
                          color={"red"}
                          cssOverride={{
                            display: "block",
                            margin: "0 auto",
                            borderColor: "red",
                          }}
                          size={100}
                          aria-label="Loading Spinner"
                          data-testid="loader" />

                      </>

                    )}



                    {resultsReady && (
                      <>
                        <ResultViewerComponent>
                          <div className="grid w-full max-w-md grid-cols-3 gap-4">
                            {images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                width={150}
                                height={200}
                                alt="Captured image"
                                className="aspect-[1/1.4142] rounded-md object-cover"
                              />
                            ))}
                          </div>
                        </ResultViewerComponent>

                        <Button variant="default" onClick={e => createRecommendations()}>
                          <WandSparklesIcon className="mr-2 h-5 w-5" />
                          Generate personalized feedback...
                          <span className="sr-only">Recommendations</span>
                        </Button>
                      </>
                    )}

                    {isCreatingRecommendations && (
                      <>
                        <ClipLoader
                          loading={isCreatingRecommendations}
                          color={"red"}
                          cssOverride={{
                            display: "block",
                            margin: "0 auto",
                            borderColor: "red",
                          }}
                          size={100}
                          aria-label="Loading Spinner Recommendations"
                          data-testid="loaderRecommendations" />

                      </>

                    )}


                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}