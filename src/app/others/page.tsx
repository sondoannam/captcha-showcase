import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const captchaTypes = [
  {
    title: "Text-Image CAPTCHA",
    description:
      "Traditional CAPTCHA that displays distorted text in an image that humans can read but bots typically cannot.",
    url: "/others/text-image",
    color: "bg-blue-50 hover:bg-blue-100",
  },
  {
    title: "Logical CAPTCHA",
    description:
      "Math-based challenges requiring users to solve simple arithmetic problems to prove human intelligence.",
    url: "/others/logical",
    color: "bg-green-50 hover:bg-green-100",
  },
  {
    title: "Voice CAPTCHA",
    description:
      "Audio-based verification that provides accessibility for visually impaired users by having them identify spoken words or numbers.",
    url: "/others/voice",
    color: "bg-purple-50 hover:bg-purple-100",
  },
];

export default function OtherCaptchasLanding() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 py-3">
        Alternative CAPTCHA Solutions
      </h1>

      <div className="max-w-4xl">
        <p className="text-gray-700 mb-8">
          While Google&apos;s reCAPTCHA is the most widely used CAPTCHA solution, there are several 
          alternative approaches to bot detection. This section demonstrates different CAPTCHA 
          implementations that can be used for various security needs and user experiences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {captchaTypes.map((type) => (
            <Link href={type.url} key={type.title} className="block">
              <Card 
                className={`${type.color} cursor-pointer transition-all border hover:shadow-md h-full`}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{type.description}</p>
                  <div className="mt-4 text-sm font-medium text-blue-600 hover:underline">
                    View Demo →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-4 border rounded-md bg-amber-50">
          <h2 className="text-lg font-semibold mb-2">Why Use Alternative CAPTCHAs?</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Different levels of security for different use cases</li>
            <li>Accessibility considerations for users with disabilities</li>
            <li>Privacy concerns with third-party solutions like reCAPTCHA</li>
            <li>Performance and user experience optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
