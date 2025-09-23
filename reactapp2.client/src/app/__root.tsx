/**
 * __root route for the app
 * 
 * @updated Sep 2025
 * @author bling
 */

import { createRootRoute, Outlet } from "@tanstack/react-router"
import FooterComponent from "../features/layout/footer"

export default function Root() {
    return (
        <div className="min-h-screen flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900">Task Management App</h1>
            <p>The page automatically polls for updates every 5 seconds {/** 5 second could be a configurable */}</p>
            <main className="flex-grow">
                <Outlet />
            </main>
            <FooterComponent />
        </div>
    )
}

export const Route = createRootRoute({ component: Root })