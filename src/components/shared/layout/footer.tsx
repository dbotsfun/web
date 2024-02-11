import { MessageCircleIcon } from "lucide-react";
import { Button } from "../../ui/button";

export default function Footer() {
    return <footer className="bg-card mt-auto w-full">
        <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div>
                    <h1 className="text-2xl font-semibold">discord<strong>bots</strong></h1>
                    <p className="mt-4 max-w-xs text-gray-500 dark:text-gray-400">
                        Browse hundreds of bots made for your community.
                    </p>
                    <div className="mt-8 flex gap-6">
                        <Button><MessageCircleIcon className="w-5 mr-2" />Join our Discord</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Services</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-muted-foreground">
                                    1on1 Coaching
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Company Review
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Accounts Review
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    HR Consulting
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    SEO Optimisation
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Company</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-muted-foreground">
                                    About
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Meet the Team
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Accounts Review
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Helpful Links</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Contact
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    FAQs
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Live Chat
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">Legal</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Accessibility
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Returns Policy
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Refund Policy
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-muted-foreground">
                                    Hiring Statistics
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()}. discordbots. All rights reserved.
            </p>
        </div>
    </footer>
}