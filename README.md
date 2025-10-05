# Invoyce - Invoicing Platform

Invoyce is an intuitive invoicing platform that allows users to create, manage, and track invoices with ease. It integrates email notifications for clients, sends reminders, and offers PDF downloads for user convenience. The platform also includes a dashboard for essential invoice analytics to help users stay on top of their finances.

## Features

- **Passwordless Login**: Users can log in by entering their email address. A verification link will be sent to their email every time they attempt to log in, providing a secure and hassle-free authentication process without needing a password.
- **Invoice Creation & Management**: Easily create invoices with our professional template, search, and filter invoices based on criteria such as status, invoice number, or client.
- **Email Integration**: Automatically send emails to clients when an invoice is created or updated. Also, send reminder emails to clients for pending invoices.
- **PDF Generation**: Download invoices in PDF format. The PDFs are generated from scratch using `jsPDF`, ensuring that content can be copied directly from the document.
- **Dashboard Analytics**: View basic invoice metrics such as:
  - Open invoices
  - Pending invoices
  - Paid invoices
  - Total revenue by currency

## Tech Stack

- **Frontend & Backend**: Built with **Next.js**, leveraging its full-stack capabilities.
- **Database**: **Postgres** as the relational database, managed with **Prisma** ORM.
- **Mail Integration**: Email notifications and client communications are managed via **Mailtrap**, ensuring secure delivery and detailed logging. 
- **Styling**: UI designed with **Tailwind CSS**, with components from **Shadcn UI** and **Aceternity UI** for a modern, responsive design.
- **PDF Generation**: `jsPDF` for building invoices in PDF format.
- **Deployment**: Deployed on **Vercel** for fast and reliable hosting. 