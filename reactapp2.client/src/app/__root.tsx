import { createRootRoute, Outlet } from "@tanstack/react-router"

export default function Root() {
    return (
        <div style={{ padding: "1rem" }}>
            <h1>Task Management App</h1>
            <hr />
            <Outlet />
        </div>
    )
}

export const Route = createRootRoute({ component: Root })