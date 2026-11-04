BIRTHDAY GIRL CELEBRATION WEBSITE

Files:
- index.html: website content
- styles.css: design and responsive layout
- script.js: surprise button, confetti and wish wall
- birthday-girl.jpg: the uploaded birthday photo

PREVIEW:
1. Extract this ZIP.
2. Open the folder in VS Code.
3. Open index.html in a browser (or use the VS Code Live Server extension).

PUBLISH WITH VERCEL:
1. Upload/push all files and the birthday-girl.jpg image to a GitHub repository.
2. In Vercel choose Add New > Project and import that repository.
3. Framework Preset: Other.
4. Root Directory: ./ (the folder containing index.html).
5. Build Command: leave blank. Output Directory: leave blank or use ./.
6. Deploy.

IMPORTANT:
The wish wall in this starter version uses the visitor's browser localStorage. That means each visitor sees only wishes saved in their own browser. For a shared wish wall visible to everyone, connect a database such as Supabase and add its table/policies.
The photo is included locally in the project, so it will appear on the published website as long as birthday-girl.jpg is uploaded beside index.html.
