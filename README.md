# Photovoltaics

The backend part of the app collects data from Fronius PV inverters via their API and saves the data into a MySQL database. The frontend part written in React is used to visualize data using numbers and charts.

The app is being built from 2021 as an alternative to the paid history functions in the original Fronius Solar.Web app.

The first version was written in Express.js and React using JavaScript. Since at the same time I participated in the MegaK programming course, where I learned about such technologies as TypeScript or NestJS, I gradually migrate the project to these modern technologies while leaving the old code in separate branches.

What does the app do?

-   Fronius API query for data from now and forwarding to the frontend
-   once a day (after adding to cron, e.g. on the server) Fronius API query and archiving detailed data from the last 24 hours in the MYSQL database
-   showing information from today (voltage and current, both AC and DC, production, inverter temperature, AC current frequency), from a given day in history, monthly and annual summary using numbers and graphs

What is there to do?

-   frontend migration to TypeScript
-   organizing the React code and dividing it into smaller, more reusable components
-   protection against the lack of internet at the inverter installation site (for now, you need to manually run the appropriate file from the cron directory after restoring the Internet connection to complete the data in the database)
-   using the CRON module in NestJS and replacing the existing solution with it
-   when migrating frontend to TypeScript using backend types
-   writing tests
