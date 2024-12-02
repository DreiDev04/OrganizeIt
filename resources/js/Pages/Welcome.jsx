import React from "react";
import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome({ auth }) {
  const { user } = auth;
  // console.log(auth);
  return (
    <>
      <Head title="Welcome to OrganizeIt" />
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="bg-background shadow-md md:p-6 py-6 ">
          <div className="container mx-auto flex justify-between items-center md:text-md">
            <Link href="/dashboard">
              <ApplicationLogo />
            </Link>
            <nav className=" flex-end">
              {user ? (
                <Link
                  href="/dashboard"
                  className="text-lg font-semibold text-foreground hover:bg-blues px-4 bg-primary rounded-lg py-2"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-lg font-semibold text-foreground hover:text-primary px-4 "
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-lg font-semibold text-foreground hover:text-primary "
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1 flex flex-col items-center justify-center text-center bg-background text-foreground py-20">
          <h2 className="text-5xl font-bold mb-6">
            Organize Your Projects Efficiently
          </h2>
          <p className="text-lg mb-8 max-w-2xl">
            OrganizeIt offers a comprehensive platform to manage your projects,
            collaborate with your team, and achieve your goals efficiently.
          </p>
          <div className="space-x-4">
            {!user && (
              <Link
                href="/register"
                className="bg-foreground text-primary font-bold py-2 px-6 rounded shadow hover:bg-muted transition"
              >
                Get Started
              </Link>
            )}

            <Link
              href="#features"
              className="bg-primary font-bold py-2 px-6 rounded shadow hover:bg-blues transition"
            >
              Learn More
            </Link>
          </div>
        </main>

        <section id="features" className="py-16 bg-foreground">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-12 text-background">
              Features
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 shadow-lg rounded-lg">
                <h4 className="text-2xl font-semibold mb-3">Admin Features</h4>
                <ul className="list-disc list-inside">
                  <li>Create and manage projects</li>
                  <li>Assign team members</li>
                  <li>View and update tasks</li>
                </ul>
              </div>
              <div className="bg-background p-6 shadow-lg rounded-lg">
                <h4 className="text-2xl font-semibold mb-3">Member Features</h4>
                <ul className="list-disc list-inside">
                  <li>Request and assign tasks</li>
                  <li>Update task status</li>
                  <li>Access dashboards</li>
                </ul>
              </div>
              <div className="bg-background p-6 shadow-lg rounded-lg">
                <h4 className="text-2xl font-semibold mb-3">Mobile Friendly</h4>
                <p>
                  Access your projects and tasks on any device with our
                  responsive design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="py-16 bg-gray-200">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-12">
              Latest News
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-foreground p-6 shadow-lg rounded-lg">
                <h4 className="text-lg font-semibold mb-4">
                  New Feature: Task Automation
                </h4>
                <p>
                  We are excited to announce the release of our new task automation feature. This will help you automate repetitive tasks and save time.
                </p>
              </div>
              <div className="bg-foreground p-6 shadow-lg rounded-lg">
                <h4 className="text-lg font-semibold mb-4">
                  Upcoming Webinar
                </h4>
                <p>
                  Join us for an upcoming webinar where we will showcase the latest features and best practices for using OrganizeIt.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        <section className="py-16 bg-background text-foreground text-center">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold mb-6">Ready to Get Started?</h3>
            <p className="text-lg mb-8">
              Join thousands of teams who are using OrganizeIt to manage their
              projects and tasks more effectively.
            </p>
            <Link
              href="/register"
              className="bg-primary text-foreground font-bold py-2 px-6 rounded shadow hover:bg-blues transition"
            >
              Sign Up Now
            </Link>
          </div>
        </section>

        <footer className="bg-background text-end py-6 text-foreground container">
          <p>&copy; 2024 OrganizeIt. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
