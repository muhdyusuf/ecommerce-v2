import { Separator } from "@/components/ui/separator"
import { AppearanceForm } from "./appearanceForm"

export default function SettingsAppearancePage() {
  return (
    <main className="p-4 md:container flex flex-col gap-4 item self-stretch">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </main>
  )
}