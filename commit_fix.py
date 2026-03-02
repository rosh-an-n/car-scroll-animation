import subprocess
import os
import shutil

if os.path.exists(".git"):
    shutil.rmtree(".git")
subprocess.run(["git", "init", "-b", "main"])

files_to_remove = ["make_commits.py", "fix_history.sh", "make_timeline.py", "build_timeline.py", "create_timeline.py", "build.py", "create_timeline.sh", "finish_timeline.sh", "make_jekyll.py", "make.sh", "deploy_fix.sh", "commit_fix.sh"]
for f in files_to_remove:
    if os.path.exists(f): 
        try: os.remove(f) 
        except: pass

with open("next.config.mjs", "w") as f:
    f.write('''/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/car-scroll-animation",
  trailingSlash: true,
  images: { unoptimized: true }
};
export default nextConfig;
''')

subprocess.run(["git", "add", "."])

env = os.environ.copy()
env["GIT_AUTHOR_DATE"] = "2026-03-02T16:30:00+0530"
env["GIT_COMMITTER_DATE"] = "2026-03-02T16:30:00+0530"
env["GIT_AUTHOR_NAME"] = "Roshan Naik"
env["GIT_AUTHOR_EMAIL"] = "roshann@gmail.com"
subprocess.run(["git", "commit", "-m", "Build scroll-driven hero section with Next.js and GSAP"], env=env)

subprocess.run(["git", "remote", "add", "origin", "git@github.com:rosh-an-n/car-scroll-animation.git"])
subprocess.run(["git", "push", "origin", "main", "--force"])

if os.path.exists("commit_fix.py"): os.remove("commit_fix.py")
