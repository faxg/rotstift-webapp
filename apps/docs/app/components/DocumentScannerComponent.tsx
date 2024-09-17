"use client"
import React, { useCallback, useEffect, useState } from 'react';
import Camera from "./camera/camera";
import { Dialog, DialogTrigger, DialogContent } from "@ui/components/ui/dialog";
import { Button } from '@ui/components/ui/button';
import { UploadIcon, CameraIcon } from "lucide-react";

function DocumentScannerComponent(props: {onImagesReady: any}) {
    const { onImagesReady } = props
    const [showDialog, setShowDialog] = useState(false);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);
    //const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    useEffect (() =>{
        console.log ("Images ready: ", capturedImages)
        onImagesReady (capturedImages)
    }, [capturedImages]);

    return (
        <>
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center justify-center space-y-4 p-8">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium">Step 1: Take pictures of the essay</h3>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            <Dialog
                                open={showDialog}
                                onOpenChange={(open) => setShowDialog(open)}
                            >
                                <DialogTrigger asChild>
                                    <Button variant="default">
                                        <CameraIcon className="mr-2 h-5 w-5" />
                                        Capture Photos
                                        <span className="sr-only">Capture</span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="h-svh w-svw max-w-full p-0">
                                    <Camera
                                        onClosed={() => {
                                            setShowDialog(false);
                                        }}
                                        onCapturedImages={(images) => {
                                            setCapturedImages(images);
                                            setShowDialog(false);
                                        }}
                                    />
                                </DialogContent>
                            </Dialog>
                            <span className=""> or </span>
                            <Button variant="default" onClick={e => alert("Not implemented yet")}>
                                <UploadIcon className="mr-2 h-5 w-5" />
                                Upload photos
                                <span className="sr-only">Upload</span>

                            </Button>
                        </div>
                        {/* Display captured images */}
                        {capturedImages.length > 0 && (
                            <div className="grid w-full max-w-md grid-cols-3 gap-4">
                                {capturedImages.map((image, index) => (
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
                        )}
                    </div>
                </div>

        </>

    );
}

export default DocumentScannerComponent;