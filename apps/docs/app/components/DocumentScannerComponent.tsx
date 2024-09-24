"use client"
import React, { useCallback, useEffect, useState } from 'react';
import Camera from "./camera/camera";
import { Dialog, DialogTrigger, DialogContent, DialogDescription, DialogTitle, DialogHeader } from "@ui/components/ui/dialog";
import { Button } from '@ui/components/ui/button';
import { UploadIcon, CameraIcon } from "lucide-react";

function DocumentScannerComponent(props: { onImagesReady: any }) {
    const { onImagesReady } = props
    const [showDialog, setShowDialog] = useState(false);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    useEffect(() => {
        console.log("Images ready: ", [...capturedImages, ...uploadedImages]);
        onImagesReady([...capturedImages, ...uploadedImages]);
    }, [capturedImages, uploadedImages]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setUploadedImages((prevImages) => [...prevImages, base64String]);
            };
            reader.readAsDataURL(file);
        }
    };

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
                                <DialogHeader>
                                    <DialogTitle>Take a snapshot with your camera</DialogTitle>
                                    <DialogDescription>
                                        Take a picture of the essay. Please make sure the writing is readable.
                                    </DialogDescription>
                                </DialogHeader>
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
                        <label htmlFor="file-upload" className='btn btn-default bg-primary text-primary-foreground hover:bg-primary/90'>
                                <UploadIcon className="mr-2 h-5 w-5" />
                                <span>Upload Pictures</span>
                                <span className="sr-only">Upload</span>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    {/* Display captured and uploaded images */}
                    {(capturedImages.length > 0 || uploadedImages.length > 0) && (
                        <div className="grid w-full max-w-md grid-cols-3 gap-4">
                            {[...capturedImages, ...uploadedImages].map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    width={150}
                                    height={200}
                                    alt="Captured or uploaded image"
                                    className="aspect-[1/1.4142] rounded-md object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div >

        </>

    );
}

export default DocumentScannerComponent;