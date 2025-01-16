import {
  Button,
  NativeSelect,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";

function CreateNotification() {
  const [segment, setSegment] = useState("");

  const Plans = {
    Free: "Free",
    Pro: "Pro",
    Business: "Business",
    Custom: "Custom",
    OtherPlan: "Other plan",
  };
  const Status = {
    Active: "Active",
    Unconfirmed: "Unconfirmed",
    Disabled: "Disabled",
  };

  // console.log("🚀 ~ CreateNotification ~ segment:", segment)
  return (
    <div className="flex flex-col">
      <Title order={1} className="font-normal text-3xl">
        Create a new notification
      </Title>

      <form
        // onSubmit={handleSubmit}
        className="mt-10 w-full flex flex-col  gap-10 px-3 "
      >
        {/* Title */}
        <div className="flex flex-col gap-3">
          <TextInput
            size="md"
            label={<div className="text-xl">Title</div>}
            placeholder="title..."
          />
          <div className="text-sm">
            <p>
              You can use the following dynamic variables:{" "}
              <span className="text-[#0071FF] ">{`{{ WEBSITE_TITLE }}, {{ NAME }}, {{ EMAIL }}`}</span>
              .
            </p>
            <p>
              You can also use Spintax format, as such:{" "}
              <span className="text-[#0071FF] ">{`{Hi | Hey | Hello}`}</span> to
              randomize words or phrases.
            </p>
          </div>
        </div>
        {/* Description */}
        <div className="flex flex-col gap-3">
          <Textarea
            size="md"
            label={<div className="text-xl">Description</div>}
            placeholder="description..."
          />
          <div className="text-sm">
            <p>
              You can use the following dynamic variables:{" "}
              <span className="text-[#0071FF] ">{`{{ WEBSITE_TITLE }}, {{ NAME }}, {{ EMAIL }}`}</span>
              .
            </p>
            <p>
              You can also use Spintax format, as such:{" "}
              <span className="text-[#0071FF] ">{`{Hi | Hey | Hello}`}</span> to
              randomize words or phrases.
            </p>
          </div>
        </div>
        {/* URL */}
        <div className="flex flex-col gap-3">
          <TextInput
            size="md"
            label={<div className="text-xl">URL</div>}
            placeholder="url..."
          />
          <div className="text-sm">
            <p>
              You can use the following dynamic variables:{" "}
              <span className="text-[#0071FF] ">{`{{ WEBSITE_TITLE }}, {{ NAME }}, {{ EMAIL }}`}</span>
              .
            </p>
            <p>
              You can also use Spintax format, as such:{" "}
              <span className="text-[#0071FF] ">{`{Hi | Hey | Hello}`}</span> to
              randomize words or phrases.
            </p>
          </div>
        </div>
        {/* Icon */}
        <div className="flex flex-col gap-3">
          <TextInput
            size="md"
            label={<div className="text-xl">Icon</div>}
            placeholder="icon..."
          />
          <div className="text-sm">
            <p>
              <span className="text-[#0071FF] ">FontAwesome</span> icon class.
            </p>
          </div>
        </div>
        {/*  Segment */}
        <div className="flex flex-col gap-3">
          <NativeSelect
            size="md"
            label={<div className="text-xl"> Segment (168)</div>}
            data={[
              { label: "All Users", value: "general" },
              { label: "Custom", value: "specific-users" },
              { label: "Filter", value: "filter" },
            ]}
            value={segment}
            onChange={(event) => setSegment(event.currentTarget.value)}
          />
          <div className="text-sm">
            <p>
              <span className="text-[#0071FF] ">FontAwesome</span> icon class.
            </p>
          </div>
        </div>

        {segment && segment == "specific-users" ? (
          <>
            {/*  Users IDs */}
            <div className="flex flex-col gap-3">
              <TextInput
                size="md"
                label={<div className="text-xl"> Users IDs</div>}
                placeholder="IDs..."
              />
              <div className="text-sm">
                <p>Comma separated values.</p>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        {segment && segment == "filter" ? (
          <div className="flex flex-col mt-15 gap-7">
            {/*  Plans */}
            <div className="flex flex-col gap-3">
              <Text className="text-xl">Plans</Text>
              <div className="w-full flex flex-wrap gap-4">
                {Object.values(Plans).map((plan) => (
                  <Switch
                    size="xs"
                    className="w-[calc(50%-8px)] "
                    label={<div className="text-base">{plan}</div>}

                    // key={form.key(`settings.enabled_bio_link_blocks.${key}`)}
                    // {...form.getInputProps(
                    //   `settings.enabled_bio_link_blocks.${key}`
                    // )}
                  />
                ))}
              </div>
            </div>
            {/*  Status */}
            <div className="flex flex-col gap-3">
              <Text className="text-xl">Status</Text>
              <div className="w-full flex flex-wrap gap-4">
                {Object.values(Status).map((status) => (
                  <Switch
                    size="xs"
                    className="w-[calc(50%-8px)] "
                    label={<div className="text-base">{status}</div>}

                    // key={form.key(`settings.enabled_bio_link_blocks.${key}`)}
                    // {...form.getInputProps(
                    //   `settings.enabled_bio_link_blocks.${key}`
                    // )}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Button className="text-base w-full">Send notification</Button>
      </form>
    </div>
  );
}

export default CreateNotification;
