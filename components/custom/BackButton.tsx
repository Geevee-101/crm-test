"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function BackButton() {
    return (
        <Button variant="outline" className="w-fit cursor-pointer" onClick={() => window.history.back()}>
            <ArrowLeft />
        </Button>
    )
}