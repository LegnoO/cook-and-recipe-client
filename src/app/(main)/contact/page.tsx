// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import { Metadata } from "next";

// ** Components
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// ** Icons
import { MapPin, Phone, Mail } from "lucide-react";

// ** SEO
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with your audience through agile and innovative cooking experiences.",
};

export default function ContactPage() {
  const contacts = [
    {
      icon: <MapPin className="h-12 w-12" />,
      title: "Address",
      description: "SILVER LAKE, United States 1941 Late Avenue",
    },
    {
      icon: <Phone className="h-12 w-12" />,
      title: "Phone",
      description: "+84 0937525531",
    },
    {
      icon: <Mail className="h-12 w-12" />,
      title: "Email",
      description: "teamcookrecipes@gmail.com",
    },
  ];

  return (
    <Fragment>
      <section className="relative max-w-full bg-contact-banner bg-cover bg-fixed bg-center bg-no-repeat">
        <div className="container">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="mt-16 w-full text-center text-background">
              <h2 className="title-slider-responsive mb-6 uppercase">
                contact us
              </h2>
              <div className="mx-auto mb-4 h-[2px] w-[4%] bg-primary" />
              <h3 className="description-slider-responsive">
                Agile cooking, connecting audiences
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="py-32">
        <div className="container">
          <h2 className="xs:text-2xl mb-6 text-center font-semibold md:text-3xl lg:text-4xl">
            Contact Information
          </h2>
          <div className="mx-auto mb-32 h-[2px] w-[4%] bg-primary" />
          <div className="grid-cols-3-res grid place-items-center">
            {contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-4">
                {contact.icon}
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-semibold">{contact.title}</p>
                  <p className="font-medium text-muted-foreground">
                    {contact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-32 pt-16">
        <div className="container">
          <div className="flex">
            <div className="w-[60%]">
              <Card className="rounded-none border-none bg-contact-form-paper pb-48 pt-32 shadow-none">
                <CardContent className="mx-auto max-w-[460px] p-0">
                  <h2 className="xs:text-2xl mb-10 text-start font-semibold tracking-wider text-background md:text-3xl lg:text-4xl">
                    {`We Can't Wait to Get You Started`}
                  </h2>
                  <div className="grid grid-cols-2 gap-8">
                    <input
                      className="flex-1 border border-b-2 border-l-0 border-r-0 border-t-0 border-placeholder bg-transparent pb-1.5 text-muted-foreground outline-none transition-colors duration-300 hover:border-primary focus:border-primary"
                      placeholder="First Name"
                    />
                    <input
                      className="flex-1 border border-b-2 border-l-0 border-r-0 border-t-0 border-placeholder bg-transparent pb-1.5 text-muted-foreground outline-none transition-colors duration-300 hover:border-primary focus:border-primary"
                      placeholder="Last Name"
                    />
                    <input
                      className="flex-1 border border-b-2 border-l-0 border-r-0 border-t-0 border-placeholder bg-transparent pb-1.5 text-muted-foreground outline-none transition-colors duration-300 hover:border-primary focus:border-primary"
                      placeholder="Phone"
                    />
                    <input
                      className="flex-1 border border-b-2 border-l-0 border-r-0 border-t-0 border-placeholder bg-transparent pb-1.5 text-muted-foreground outline-none transition-colors duration-300 hover:border-primary focus:border-primary"
                      placeholder="E-mail"
                    />
                  </div>
                  <input
                    className="mt-8 w-full border border-b-2 border-l-0 border-r-0 border-t-0 border-placeholder bg-transparent pb-3 text-muted-foreground outline-none transition-colors duration-300 hover:border-primary focus:border-primary"
                    placeholder="Message"
                  />
                </CardContent>

                <CardFooter className="mx-auto max-w-[460px] p-0 pt-6">
                  <div className="space-y-4">
                    <p className="flex flex-wrap items-center gap-1.5 text-sm tracking-tight text-secondary">
                      <Checkbox id="privacy-policy" className="h-4 w-4" />

                      <label
                        className="flex items-center gap-1.5"
                        htmlFor="privacy-policy">
                        <span>
                          I have read and agreed the Terms, Conditions and
                        </span>
                        <span className="text-primary">Privacy Policy.</span>
                      </label>
                    </p>
                    <Button
                      size="lg"
                      type="button"
                      className="min-w-40 rounded-3xl font-medium uppercase tracking-wider">
                      Submit
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="w-[40%]">
              <div className="h-full overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4850744446494!2d106.7041704!3d10.7741113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f46c05e50cd%3A0xcbb7775cc10f6cb2!2zTmjDoCBzw6FjaCBOZ3V54buFbiBIdeG7hw!5e0!3m2!1svi!2s!4v1737664251445!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
