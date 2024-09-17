"use client"
import React, { useCallback, useEffect, useState } from 'react';

import { Dialog, DialogTrigger, DialogContent } from "@ui/components/ui/dialog";
import { Button } from '@ui/components/ui/button';
import { UploadIcon, CameraIcon, CogIcon } from "lucide-react";

function ResultViewerComponent({ children }: { children: React.ReactNode; }) {

    return (
        <>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                    <div className="flex flex-col items-center justify-center space-y-4 p-8">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium">Step 2: Review the results</h3>
                        </div>
                        <div className="flex items-center justify-center space-x-4">
                            {children}
                        </div>

                    </div>
                </div>
            </main>
        </>

    );
}

export default ResultViewerComponent;